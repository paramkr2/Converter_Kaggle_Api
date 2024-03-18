// notebookCreator.js

const createCell = (code) =>{ 
	const cell = {
        cell_type: 'code',
        execution_count: null,
        metadata: {},
        outputs: [],
        source: [code]
    };
	return cell
}

export const createNotebook = (videoUrl,crfValue,fileName) => {
    // Define the content of the notebook cells
    // Create a new notebook object with the defined cells
    return {
        cells: [	createCell('!pip install yt-dlp'), 
					createCell(`!yt-dlp --output zvideo ${videoUrl}`),
					createCell(`!ffmpeg -i zvid* -c:v libx265 -preset fast -crf ${crfValue} ${fileName}.mkv`)
					
				],
        metadata: {
            kernelspec: {
                display_name: 'Python 3',
                language: 'python',
                name: 'python3'
            },
            language_info: {
                codemirror_mode: {
                    name: 'ipython',
                    version: 3
                },
                file_extension: '.py',
                mimetype: 'text/x-python',
                name: 'python',
                nbconvert_exporter: 'python',
                pygments_lexer: 'ipython3',
                version: '3.7.3'
            }
        },
        nbformat: 4,
        nbformat_minor: 4
    };
};
