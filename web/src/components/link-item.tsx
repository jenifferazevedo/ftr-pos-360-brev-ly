import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Copy, Trash } from '@phosphor-icons/react';
import type { AxiosError } from 'axios';
import { copyURLToClipboard } from '../utils/copy-url';
import type { Link } from '../models/link.interface';
import { deleteLink } from '../services/link.service';
import { errorNotification } from '../utils/notification-messages';
import { ToastNotification } from './toast-notification';

interface LinktItemProps {
    link: Link;
}

export default function LinkItem({ link }: LinktItemProps) {
    const [openNotification, setOpenNotification] = useState(false);
    const [errorStatus, setErrorStatus] = useState<number | undefined>();
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (shortLink: string) => deleteLink(shortLink),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['links'] });
        },
        onError: (error: AxiosError) => {
            setErrorStatus(error.status)
            setOpenNotification(true)
        }
    });

    const copyLink = () => {
        copyURLToClipboard(`${import.meta.env.VITE_FRONTEND_URL}${link.shortLink}`);
        setOpenNotification(true);
    }

    const onDeleteLink = () => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if (!confirmed) {
            return;
        }
        mutate(link.shortLink)
    }

    const closeNotification = () => {
        setOpenNotification(false);
        setErrorStatus(undefined);
    }

    const notification = {
        title: 'Link copiado com sucesso',
        description: `O link ${link.shortLink} foi copiado para a àrea de transferência.`
    }

    return (
        <div className='flex gap-4 items-center py-0.5'>
            <div className='flex flex-col gap-1 flex-grow min-w-0'>
                <a
                    href={`${import.meta.env.VITE_FRONTEND_URL}${link.shortLink}`}
                    target='_blank'
                    className='text-md truncate text-blue-base'>
                    {`${import.meta.env.VITE_FRONTEND_URL}${link.shortLink}`}
                </a>
                <p className='truncate text-gray-500 text-sm'>{link.link}</p>
            </div>
            <span className='text-sm text-gray-500 whitespace-nowrap flex-shrink-0'>
                {`${link.accessQuantity} ${link.accessQuantity < 2 ? 'acesso' : 'acessos'}`}
            </span>
            <div className='flex gap-1'>
                <button
                    className='h-8 w-8 bg-gray-200 rounded-[4px] flex justify-center items-center cursor-pointer hover:border hover:border-blue-base'
                    onClick={copyLink}>
                    <Copy size={16} className='text-gray-600' />
                </button>
                <button
                    className='h-8 w-8 bg-gray-200 rounded-[4px] flex justify-center items-center cursor-pointer hover:border hover:border-blue-base'
                    onClick={onDeleteLink}>
                    <Trash size={16} className='text-gray-600' />
                </button>
            </div>
            <ToastNotification
                title={errorStatus ? errorNotification.global[500].title : notification.title}
                description={errorStatus ? errorNotification.global[500].description : notification.description}
                open={openNotification}
                onOpenChange={closeNotification}
                type={errorStatus ? 'error' : 'info'}
            />
        </div>
    );
}
