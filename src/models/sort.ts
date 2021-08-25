type Sort = {
	by: By;
	order: Order;
};
export type By = "id" | "name" | "description" | "address";
export type Order = "asc" | "desc";
export default Sort;
