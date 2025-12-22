import { catalogData } from "../../../data/catalogData";
import { ICategory } from "../../../types";
import { IEvents } from "../Events";
import { eventsList } from "../../../utils/constants";


export class CatalogModel {
  protected catalogItems: ICategory[] = []

  constructor(protected events: IEvents) { }

  public getCatalogItems(): ICategory[] {
    return this.catalogItems;
  }

  public getCatalogCategoryById(id: string): ICategory | null {
    return this.catalogItems.find(item => item.id === id) || null;
  }

  public setCatalogItems(): void {
    this.catalogItems = catalogData;
    this.events.emit(eventsList["catalogItems:changed"]);
  }

}