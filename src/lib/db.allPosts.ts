import axios from "axios";

export async function findAllPosts() {
    try {
        const res = await axios.get("/api/post/allPosts")
        return res.data
    } catch (error: any) {
        return error
    }
}

