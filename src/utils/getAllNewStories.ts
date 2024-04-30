export const getAllNewStories = async () => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json`)

        const data = await response.json()

        return data.slice(0, 100)
    } catch (error) {
        throw new Error("Failed to get all new stories");
    }
}