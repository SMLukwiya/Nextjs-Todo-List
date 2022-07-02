import { useQuery } from "react-query";

export const useFetchTodoById = (id, fetchFn) => {
    const {isLoading, data, isError, error} = useQuery(['todo', id], fetchFn);

    return [isLoading, data, isError, error]
}