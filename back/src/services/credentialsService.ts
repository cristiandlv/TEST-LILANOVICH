import { credentialModel } from "../config/data-source";  // Asegúrate de usar el repositorio correcto

interface CreateCredentialParams {
    username: string;
    password: string;
}

export const createCredential = async ({ username, password }: CreateCredentialParams) => {
    const newCredential = credentialModel.create({ username, password });
    await credentialModel.save(newCredential);
    return newCredential;
};
