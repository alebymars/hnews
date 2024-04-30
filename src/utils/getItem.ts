export const getItem = async (id: number) => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)

        const data = await response.json()

        return data
    } catch (error) {
        throw new Error("Failed to get item");
    }
}