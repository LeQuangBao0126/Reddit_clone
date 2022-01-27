import {Arg, Mutation, Resolver, Query} from "type-graphql";
import {PostMutationResponse} from "../types/PostMutationResponse";
import {CreatePostInput} from "../types/CreatePostInput";
import {Post} from "../entities/Post";
import {UpdatePostInput} from "../types/UpdatePostInput";
@Resolver()
export class PostResolver {
     @Mutation(_return => PostMutationResponse )
     public async PostPost(
         @Arg('createPostInput') createPostInput : CreatePostInput
     ): Promise<PostMutationResponse > {
         try {
              let newPost = Post.create({
                   title : createPostInput.title,
                   text : createPostInput.text
              })
              await  Post.save(newPost)
              return {
                   code : 200 ,
                   success : true,
                   message :"Post create success",
                   data: newPost
              }
         }catch(e){
              return {
                   code : 400 ,
                   success : true,
                   message :"Post create fail"
              }
         }
     }
     @Query(_return => [Post]  , {nullable : true} )
     public async GetAllPost() : Promise<Post[] | null>{
          let posts = await Post.find()
          if(posts){
               return posts
          }
          return null
     }
     @Query(_return => Post  , {nullable : true} )
     public async GetPost(@Arg("id", ) id : number) : Promise<Post | null>{
          let post = await Post.findOne({where : {id : id}})
          if(post){
               return post
          }
          return null
     }

     @Mutation(_return => PostMutationResponse)
     public async updatePost (@Arg('updatePostInput') updatePostInput : UpdatePostInput
     ) : Promise<PostMutationResponse>{
          const post = await Post.findOne({where : {id : updatePostInput.id }})
          if(!post){
               return {
                    code : 400 ,
                    success : false,
                    message :"Bad Request"
               }
          }
          post.title = updatePostInput.title
          post.text = updatePostInput.text
          await post.save()
          return {
               code : 200 ,
               success : true
          }
     }

     @Mutation(_return => Boolean)
     public async deletePost(@Arg("id") id : number) : Promise<boolean> {
          const post = await Post.findOne({where : {id :  id }})
          if(!post) return false
          await post.remove()
          return true
     }
}
