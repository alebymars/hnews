export const getAllNewStories = async () => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/newstories.json?limitToFirst=100&orderBy="$key"`)

        const data = await response.json()

        return data
    } catch (error) {
        throw new Error("Failed to get all new stories");
    }
}