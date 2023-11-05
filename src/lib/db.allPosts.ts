import axios from "axios";

export async function findAllPosts() {
    try {
        const res = await axios.get("/api/post/allPosts")
        return res.data
    } catch (error: any) {
        return error
    }
}

export async function findCoachPosts(id:string){
    try {
        const find = await axios.get("/api/user/coach/posts", {
            params:  {
                CoachId : id
            }
        })
        return find.data
    } catch (error : any) {
        return error
    }
}