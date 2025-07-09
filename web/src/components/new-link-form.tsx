import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { WarningIcon } from '@phosphor-icons/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { LinkSummary } from '../models/link.interface';
import { isShortLinkValid } from '../utils/is-short-link-valid';
import { createLink } from '../services/link.service';
import { LoadingSpinner } from './ui/loading-spinner';
import { ToastNotification } from './toast-notification';
import { errorNotification } from '../utils/notification-messages';

function validateShortLinkInput(value?: string) {
  const message = 'Informe uma url minúscula e sem espaços/caracter especial'
  if (!value) return message;
  return isShortLinkValid(value) || message;
}
export function NewLinkForm() {
  const [openNotification, setOpenNotification] = useState(false);
  const [errorStatus, setErrorStatus] = useState<number | undefined>();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (link: LinkSummary) => createLink(link),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] }); // refresh list
      reset(); 
    },
    onError: (error: AxiosError) => {
      setErrorStatus(error.status)
      setOpenNotification(true)
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LinkSummary>();

  const onSubmit = (data: LinkSummary) => mutate(data);

  const closeNotification = () => {
    setOpenNotification(false);
    setErrorStatus(undefined);
  }

  return (
      <div className="w-full p-8 rounded-2xl bg-gray-100 flex flex-col gap-5" style={{ minWidth: '360px', maxWidth: '380px' }}>
        <h2 className="text-lg font-bold text-gray-600">Novo Link</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col group focus-within:outline-none">
              <label htmlFor="link" className={`mb-1 font-medium transition-colors uppercase text-xs ${errors.link ? 'text-danger font-bold' : 'text-gray-500 group-focus-within:text-blue-base group-focus-within:font-bold'}`}>Link Original</label>
              <input
                type="text"
                placeholder="www.exemplo.com.br"
                className={`peer text-base border rounded-lg p-2 outline-none transition-colors focus:ring-[1.5px placeholder-gray-400 text-gray-600 ${errors.link ? 'border-danger focus:border-danger focus:ring-danger ring-danger ring-[1.5px]' : 'border-gray-300 focus:border-blue-base focus:ring-blue-base'}`}
                {...register('link', { required: 'Este campo é obrigatório' })}
              />
              {errors.link && typeof errors.link?.message === 'string' && (
                <span className="text-gray-500 text-xs mt-1">{errors.link.message}</span>
              )}
            </div>

            <div className="flex flex-col group focus-within:outline-none">
              <label htmlFor="shortLink" className={`mb-1 font-medium transition-colors uppercase text-xs ${errors.shortLink ? 'text-danger font-bold' : 'text-gray-500 group-focus-within:text-blue-base group-focus-within:font-bold'}`}>Link Encurtado</label>
              <input
                type="text"
                placeholder="brev.ly/"
                className={`text-base border rounded-lg p-2 outline-none transition-colors focus:ring-[1.5px] placeholder-gray-400 text-gray-600 ${errors.shortLink ? 'border-danger focus:border-danger focus:ring-danger ring-danger ring-[1.5px]' : 'border-gray-300 focus:border-blue-base focus:ring-blue-base'}`}
                {...register('shortLink', {
                  validate: validateShortLinkInput,
                })}
              />
              {errors.shortLink && typeof errors.shortLink?.message === 'string' && (
                <span className="flex text-gray-500 text-xs mt-1 gap-x-1">
                    <WarningIcon size={16} className="text-danger" />
                    {errors.shortLink.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="mt-1 bg-blue-base hover:bg-blue-dark text-white rounded-lg p-2 transition flex justify-center items-center gap-2"
            >
              {isPending && <LoadingSpinner size={5} />}
              Salvar link
            </button>
          </form>
          <ToastNotification 
            title={errorStatus === 409 ? errorNotification.forms[409].title : errorNotification.global[500].title} 
            description={errorStatus === 409 ? errorNotification.forms[409].description : errorNotification.global[500].description} 
            open={openNotification}
            onOpenChange={closeNotification}
            type='error' 
          />
        </div>
  );
}