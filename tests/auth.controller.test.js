import request from "supertest";
import { it, describe, expect , afterAll , beforeEach , beforeAll } from "vitest";
import { connect, clearDatabase, closeDatabase } from "./test-db.js";
import server from "../app.js";
import {getMockUser} from "./utils.js"


beforeAll(async () => {
  await connect();
});
beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe("[INTEGRATION] : auth controller", () => {

    const paths = {signup:"/auth/signup", login:"/auth/login"};
  describe("user register", () => {

    it("should throw validation error when receiving invalid data", async () => {

      const response = await request(server).post(paths.signup).send({})
      expect(response.status).toBe(422)
      expect(response.body).toMatchObject({ status: "error" });
    });

    it("should throw conflict error when creating a user with duplicate email", async()=>{
      
      const existing = getMockUser()
      const duplicate  = getMockUser({email:existing.email})

      await request(server).post(paths.signup).send(existing).expect(201)

      const response = await request(server).post(paths.signup).send(duplicate)
      expect(response).toMatchObject({
        status:409,
        body:expect.objectContaining({
          status:"error",
          code:expect.stringMatching(/conflict/i)

        })
      })

    })
    it('should create a user and return their data', async () => {
      const mockUser = getMockUser()

      const response = await request(server).post(paths.signup).send(mockUser)

      expect(response.status).toBe(201)
      expect(response.body).toMatchObject({
        status:"success",
        data:{user:expect.objectContaining({email:mockUser.email, _id:expect.any(String)})}
      })


    })
  });
  describe("user login" , ()=>{
    it('should throw unauthorized error when login with invalid credentials', async () => {
        const user = getMockUser()      
        await request(server).post(paths.signup).send(user).expect(201)
        
        const {email,password} = user
        const response = await request(server).post(paths.login).send({email, password:password+"1"})  
        
        expect(response).toMatchObject({
          status:401,
          body:{
          code:expect.stringMatching(/unauthorized/i)
        }
      })
    })

    it("should throw validation error when receiving invalid data", async () => {
      const response = await request(server).post(paths.login).send({})
      expect(response.status).toBe(422)
      expect(response.body).toMatchObject({ status: "error" })
    })

    it("should throw not found error when login with non-existent email", async () => {
      const user = getMockUser()
      const response = await request(server).post(paths.login).send({email:user.email, password:user.password})

      expect(response).toMatchObject({
        status:404,
        body:{
          status:"error",
          code:expect.stringMatching(/not_found/i)
        }
      })
    })

    it("should login successfully and return user data with token", async () => {
      const user = getMockUser()
      await request(server).post(paths.signup).send(user).expect(201)

      const {email,password} = user
      const response = await request(server).post(paths.login).send({email, password})

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        status:"success",
        data:{
          user:expect.objectContaining({email:user.email, _id:expect.any(String)}),
          token:expect.any(String)
        }
      })
    })
  }) 
});
