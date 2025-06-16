 // управляющий интерфейс
export type ReserveState = {
  stage: 1 | 2 | 3; // Текущая стадия
  Stage1: data_stage_1 | null; // Данные из stage_1
  Stage2: data_stage_2 | null; // Данные из stage_2
  Stage3: data_stage_3 | null; // Данные из stage_3
};
 // Интерфейс для контроля данных
export type ReserveAction =
  | { type: 'SET_STAGE_1'; payload: data_stage_1 }
  | { type: 'SET_STAGE_2'; payload: data_stage_2 }
  | { type: 'SET_STAGE_3'; payload: data_stage_3 }
  | { type: 'NEXT_STAGE' }
  | { type: 'PREV_STAGE' };

export type data_stage_1 = {
  datatime: string | null;
  adress: string | null;
  guests: number | null;
  r_tables: number[] | null;
  all_tables: tables[] | null;
}
type tables = {
  capacity: number;
  number: number;
}
export type data_stage_2 = {
  table: string[] | null;
}
export type data_stage_3 = {
  additionalInfo: string | null;
  name: string;
  phone: string;
  email: string | null;
  // Дальше по месту смотреть буду. Пока нет идеи как раскидать предзаказ
}