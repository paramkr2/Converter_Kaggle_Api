import axios from 'axios';
import { createNotebook } from './notebookCreator.js';
//const username = process.env.USER_NAME;
//const apiKey = process.env.API_KEY;
//const authString = Buffer.from(`${username}:${apiKey}`).toString('base64');
// Function to push the kernel version
export const pushKernel = async (username, apiKey,videoUrl,crfValue,name) => {
    try {
		const authString = Buffer.from(`${username}:${apiKey}`).toString('base64');
		// filename formatting is needed later.. for removing anyting like spaces and non alphabets 
		const fileName = (name==undefined)?'fileoutput':name ; // use if name is available 
        const notebook = createNotebook(videoUrl,crfValue,fileName);
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
            enableInternet: "true",
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
        console.log(`URL: ${url}`);
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
export async function checkKernelStatus(username, apiKey,notebookId) {
    try {
		const authString = Buffer.from(`${username}:${apiKey}`).toString('base64');
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
			return status ;
			/**
            if (status !== 'complete') {
                await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 1 second before checking again
            }
			**/
        }
        console.log('Kernel execution completed.');
        return;
    } catch (error) {
        console.error('Error fetching kernel status:', error);
        throw error;
    }
}
// Main function
export async function downloadKernelOutput(username, apiKey,notebookId) {
    try {
		const authString = Buffer.from(`${username}:${apiKey}`).toString('base64');
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

        
        return files;
    } catch (error) {
        console.error('Error downloading kernel output:', error);
        throw error;
    }
}
// Main function

export async function checkUserCredentials(username, apiKey) {
    const authString = Buffer.from(`${username}:${apiKey}`).toString('base64');
    try {
        const response = await axios.get('https://www.kaggle.com/api/v1/kernels/list', {
            headers: {
                'Authorization': `Basic ${authString}`
            }
        });

        //console.log('Kernel list:', response.data);
		if( response.data.message == 'Unauthorized access' ){
			return false
		}else{
			return true 
		}
    } catch (error) {
        console.error('Error downloading kernel list:', error.message);
        throw error; // Re-throwing the error to be handled by the caller
    }
}


/**
async function main() {
	let videoUrl = 'https://www.youtube.com/watch?v=0GeCBavvPH8'
	let crfValue = '32'
    const notebookId = await pushKernel(videoUrl,crfValue);
    try {
        await checkKernelStatus(notebookId);
        await downloadKernelOutput(notebookId);
    } catch (error) {
        console.error('Error in main function:', error);
    }
}

// Call the main function
main();

**/
