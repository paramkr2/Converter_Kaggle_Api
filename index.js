import axios from 'axios';
import { createNotebook } from './notebookCreator.js';
import dotenv from 'dotenv';
dotenv.config({ path: 'var.env' });

const username = process.env.USER_NAME;
const apiKey = process.env.API_KEY;
const authString = Buffer.from(`${username}:${apiKey}`).toString('base64');
// Function to push the kernel version
async function pushKernel(username, apiKey,authString) {
    try {
        const notebook = createNotebook();
        console.log(notebook);

        const notebookId = "n-" + new Date().getTime().toString(36);
        const payload = {
            slug: `${username}/${notebookId}`,
            newTitle: notebookId,
            text: JSON.stringify(notebook),
            language: "python",
            kernelType: "notebook",
            isPrivate: "true",
            enableGpu: "false",
            enableTpu: "false",
            enableInternet: "false",
            datasetDataSources: [],
            competitionDataSources: [],
            kernelDataSources: [],
            modelDataSources: [],
            categoryIds: [],
        };

        

        const response = await axios.post('https://www.kaggle.com/api/v1/kernels/push', payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authString}`
            }
        });
        const url = response.data.url;
        const hasError = response.data.hasError;

        console.log(`URL: ${url}`);
        console.log(`Has Error: ${hasError ? 'Yes' : 'No'}`);
		if(url===undefined){
			throw new Error('Url is Undefined: Check Creditionals or Payload')
		}
        return notebookId;
    } catch (error) {
        console.error('Error pushing kernel version:', error);
        throw error;
    }
}

// Function to check kernel status
// Function to check kernel status
async function checkKernelStatus(username, notebookId, authString) {
    try {
        let status = '';
        while (status !== 'complete') {
            const statusUrl = `https://www.kaggle.com/api/v1/kernels/status?userName=${username}&kernelSlug=${notebookId}`;
            const response = await axios.get(statusUrl, {
                headers: {
                    'Authorization': `Basic ${authString}`
                }
            });
            status = response.data.status;
			console.log(`Kernel Status ${status}`)
            if (status !== 'complete') {
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
            }
        }
        console.log('Kernel execution completed.');
        return;
    } catch (error) {
        console.error('Error fetching kernel status:', error);
        throw error;
    }
}
// Main function
async function downloadKernelOutput(username, notebookId, authString) {
    try {
        const response = await axios.get('https://www.kaggle.com/api/v1/kernels/output', {
            params: {
                userName: username,
                kernelSlug: notebookId
            },
            headers: {
                'Authorization': `Basic ${authString}`
            }
        });
        const files = response.data.files.map(file => ({
            name: file.fileName,
            link: file.url
        }));

        console.log('Processed files:', files);
        return files;
    } catch (error) {
        console.error('Error downloading kernel output:', error);
        throw error;
    }
}
// Main function
async function main() {
    const notebookId = await pushKernel(username, apiKey,authString);

    try {
        await checkKernelStatus(username, notebookId, authString);
        await downloadKernelOutput(username, notebookId, authString);
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

// Call the main function
main();
