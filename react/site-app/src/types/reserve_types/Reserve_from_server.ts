
export interface Reserve_from_server
{
    r_capacity: number;
    r_tables: number[];
    reservation_time: string;
}
export interface Array_reserve
{
    reservations: Reserve_from_server[];
    numbers: number[];
}
export interface Render_interface
{
    array: Reserve_from_server[];
}