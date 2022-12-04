export class VacationModel {
  public id: number;
  public description: string;
  public destination: string;
  public image: string;
  public from_date: string;
  public to_date: string;
  public price: number;
  public followers: number;
  public isFollowed:boolean;

  constructor(vacation:VacationModel){
    this.id = vacation.id
    this.description = vacation.description
    this.destination = vacation.destination
    this.image = vacation.image
    this.from_date = vacation.from_date
    this.to_date = vacation.to_date
    this.price = vacation.price
    this.followers = vacation.followers
  }
};