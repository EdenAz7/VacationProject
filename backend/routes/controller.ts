import express, { NextFunction, Request, Response } from "express";
import logic from "../logic/logic";
import verifyToken from '../middleware/verify-token'
import jwt from "../utils/jwt";
import  SavedModel from "../model/savedVacation";


const router = express.Router();


// login
router.post('/api/login/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userLogin = await logic.login(request.body);
    response.status(201).json(userLogin)
  }
  catch (error: any) {
    next(error);
  }
});

// register
router.post('/api/register/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const newUser = await logic.addUser(request.body);
    response.status(201).json(newUser);
  }
  catch (error: any) {
    next(error);
  };
});

router.get("/api/user", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const user = await logic.getAllUsers();
    response.status(200).json(user);
  }
  catch (err: any) {
    next(err);
  };
});

router.get("/api/vacation", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const vacations = await logic.getAllVacations();
    response.status(200).json(vacations)
  }
  catch (err: any) {
    next(err)
  };
});

router.post("/api/addVacation", async (request: Request, response: Response, next: NextFunction)=>{
  try{
    const addVacation = await logic.addNewVacation(request.body);
    response.status(202).json(addVacation);
  } catch(err:any){
    next(err);
  }
});

router.get("/api/vacation/:id", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = +request.params.id;
    const vacation = await logic.getOneVacation(id);
    response.json(vacation);
  }
  catch (err: any) {
    next(err)
  };
});

router.post('/api/followVacation', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const sendInfo = await logic.followVacation(request.body);
    response.status(201).json(sendInfo);
  }
  catch (err: any) {
    next(err)
  }
});

router.get('/api/getFollowedVacations', async (request: Request, response: Response, next: NextFunction) => {
  try {
        const user = jwt.getUserFromToken(request);
        const followedVacation = await logic.getAllFollowedVacations(user.id);
        response.status(201).json(followedVacation);
  }
  catch (err: any) {
    next(err)
  }
});
router.put("/api/updateVacation/:id", async (request: Request, response: Response, next: NextFunction) => {
  try {
      const updateVacation = await logic.updateFullVacation(request.body);
      response.status(201).json(updateVacation);
  }
  catch (err: any) {
      next(err);
  }
});

router.delete('/api/deleteVacation/:vacationId', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const vacationId = +request.params.vacationId;
    await logic.deleteVacation(vacationId);
    response.status(202).json("{msg:'done'}");
  }
  catch (err: any) {
    next(err)
  }
});

// remove followed vacation
router.delete('/api/delete/:vacationId/:userId', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userId = +request.params.userId;
    const vacationId = +request.params.vacationId;
    await logic.deleteFollowedVacation(userId, vacationId);
    response.status(202).json("{msg:'done'}");
  }
  catch (err: any) {
    next(err)
  }
});

// Follow vacation router
router.post("/api/addfollow/:id",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const vacationId = +request.params.id;
    const user = jwt.getUserFromToken(request);
    const follow = new SavedModel(user.id, vacationId);
    const followedVacation = await logic.addFollow(follow);
    response.status(201).json(followedVacation);
}
catch (err: any) {
    next(err);
}
});

// Delete follow from vacations
router.delete("/api/remove/:id",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
  try {
    const vacationId = +request.params.id;
    const user = jwt.getUserFromToken(request);
    const follower = new SavedModel(user.id, vacationId);
    await logic.removeFollow(follower);
    response.status(204).json(follower);
  }
  catch (err: any) {
      next(err);
  }
})

export default router;