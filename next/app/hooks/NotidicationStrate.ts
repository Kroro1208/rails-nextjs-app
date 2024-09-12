import { useToast } from "@/hooks/use-toast";
import useSWR from "swr";
import { useCallback } from 'react';

export const useNotificationState = () => {
    type NotificationStateType = {
        message: string | null;
        variant: 'default' | 'success' |'destructive' | null;
        pathname: string | null;
    }

    const fallbackData: NotificationStateType = {
        message: null,
        variant: null,
        pathname: null
    }

    const { data: state, mutate: setState } = useSWR('notification', null, {
        fallbackData: fallbackData
    });

    const { toast } = useToast();
    
    const showNotification = useCallback((newState: NotificationStateType) => {
        setState(newState);
        if(newState.message) {
            toast({
                description: newState.message,
                variant: newState.variant || 'default'
            });
        }
    }, [setState, toast]);

    return { notificationState: state, showNotification };
}