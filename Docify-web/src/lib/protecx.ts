import { ProtecX, ProtecXError } from '@protecx/js';

export const protecx = new ProtecX({
  baseUrl: "https://protecx.onrender.com/api/v1",
  projectId: "a53cb6ae-d67b-4aa9-bdd1-e3ce44dee5ab", // Replace with actual project ID
  apiKey: "sx_dev_41eee068b696da294c603fc5925e26b9",   // Replace with actual API key
  persistTokens: true // Automatically saves session to localStorage
});