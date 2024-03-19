export const pushKernel = async (username, key, videoUrl, crfValue, name) => {
  return Math.random().toString(36).substring(2, 12);
};

export const  checkUserCredentials = async (username, apiKey) => {
	return true ;
};


export const  checkKernelStatus = async (username, apiKey,notebookId) => {
	// should return either queued , completed , running 
	return 'running'
};