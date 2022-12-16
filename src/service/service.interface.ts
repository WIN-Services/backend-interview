export interface BaseService {
  name: string;
  is_active?: Boolean;

}

export interface Item extends BaseService {
  id: number;
}