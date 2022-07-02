import { useMutation } from 'react-query';

export const useMutateTodo = ({mutateFn, onSuccess, onError}) => {

    const {mutate, isLoading: isMutating} = useMutation(mutateFn, {
        onSuccess,
        onError
    })

    return {mutate, isMutating};
}