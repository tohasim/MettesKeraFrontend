export const API_URL =
	location.hostname === "localhost" || location.hostname === "127.0.0.1"
		? "http://localhost:8080/api"
		: "https://slutaflevering.azurewebsites.net/api";
export const SAS_TOKEN =
	"?sv=2023-01-03&st=2023-11-30T09%3A37%3A16Z&se=2024-03-07T09%3A53%3A00Z&sr=c&sp=rl&sig=YiC44v4kY%2FTXEnY1z8GJ0VE9gkIq0uY%2FoYx4eY%2B1Y7k%3D";
