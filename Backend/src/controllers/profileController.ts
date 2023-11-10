import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Path,
    Post,
    Route,
    SuccessResponse,
  } from '@tsoa/runtime';
  import { ProfileCreate, ProfilePatch } from '../interfaces/profileInterface';
  import { ProfileModel } from '../models/mongodb.model';
  
  @Route('profile')
  export class ProfileController extends Controller {
    @SuccessResponse('201', 'profile created')
    @Post()
    public async addProfile(@Body() postRequestBody: ProfileCreate) {
      // log request body
      console.info(`Adding profile data: ${JSON.stringify(postRequestBody)}`);
  
      // save profile data to database
      const newProfile = new ProfileModel({
        firstName: postRequestBody.firstName,
        lastName: postRequestBody.lastName,
        gender: postRequestBody.gender,
        dob: postRequestBody.dob,
        phone:postRequestBody.phone,
        address:postRequestBody.address,
        city:postRequestBody.city,
        state:postRequestBody.state,
        email: postRequestBody.email,
      });
      const createResp = await newProfile.save();
  
      console.info(`Create Profile Response: ${JSON.stringify(createResp)}`);
      return newProfile;
    }
  
    @SuccessResponse('200', 'profiles fetched')
    @Get()
    public async getProfiles() {
      console.info(`Fetching profiles data...`);
  
      // fetch profiles data from database
      const profiles = await ProfileModel.find();
  
      console.info(`Profiles: ${JSON.stringify(profiles)}`);
      return profiles;
    }
  
    @SuccessResponse('200', 'profile fetched')
    @Get('/{email}')
    public async getProfile(@Path() email: string) {
      console.info(`Fetching profile data for email: ${email}`);
  
      // fetch profile data from database
      const profile = await ProfileModel.findOne({email:email});
  
      console.info(`Profile: ${JSON.stringify(profile)}`);
      return profile;
    }
  
    @SuccessResponse('204', 'profile deleted')
    @Delete('/{email}')
    public async deleteProfile(@Path() email: string) {
      console.info(`Deleting profile data for email: ${email}`);
  
      // delete profile data from database
      const deleteResp = await ProfileModel.findOneAndDelete({email:email});
  
      console.info(`Delete Profile Response: ${JSON.stringify(deleteResp)}`);
    }
  
    @SuccessResponse('200', 'profile updated')
    @Patch('/{email}')
    public async updateProfile(
      @Path() email: string,
      @Body() patchRequestBody: ProfilePatch
    ) {
      console.info(`Fetching profile data for email: ${email}`);
  
      // update profile data from database
      await ProfileModel.findOneAndUpdate({email:email}, patchRequestBody);
  
      // get updated profile data from database
      const updateResp = await ProfileModel.findOne({email:email});
  
      console.info(`Update Profile Response: ${JSON.stringify(updateResp)}`);
      return updateResp;
    }
  }
  
