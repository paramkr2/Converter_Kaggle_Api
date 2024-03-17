// notebookCreator.js
export const createNotebook = () => {
    // Define the content of the notebook cells
    const cell1 = {
        cell_type: 'code',
        execution_count: null,
        metadata: {},
        outputs: [],
        source: ['print("This is it")']
    };

    const cell2 = {
        cell_type: 'code',
        execution_count: null,
        metadata: {},
        outputs: [],
        source: ['open("dummy.txt", "w").write("This is a dummy file.")']
    };

    // Create a new notebook object with the defined cells
    return {
        cells: [cell1, cell2],
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
