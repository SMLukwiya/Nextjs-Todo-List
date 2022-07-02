import { useQuery } from "react-query"

export const useFetchTodo = ({queryId, fetchFn}) => {
    const {isLoading, data,isError, error} = useQuery(queryId, fetchFn)

    return [isLoading, data, isError, error];
}