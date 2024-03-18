export async function httpFetch (
    endpoint: string,
    method: string,
    body: object
) {
    const PORT_BACK = import.meta.env.VITE_PORT_BACK;
    const apiUrl = `http://localhost:${PORT_BACK}/v1`;

    return await fetch(
        `${apiUrl}${endpoint}`,
        {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(
                body
            )
        }
    );
}