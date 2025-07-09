import * as Toast from "@radix-ui/react-toast";
import { WarningCircleIcon } from "@phosphor-icons/react";

interface ToastInformationProps {
  title: string;
  description: string;
  type: 'error' | 'info'
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ToastNotification = ({ title, description, type, open, onOpenChange }: ToastInformationProps) => {
	return (
		<>
            <Toast.Root
				className={`grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md p-[15px] ${type === 'error' ? 'bg-red-200' : 'bg-blue-200'} shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]`}
				open={open}
				onOpenChange={onOpenChange}
			>
				<Toast.Title className={`flex items-center gap-1.5 ${type === 'error' ? 'text-danger' : 'text-blue-dark'}`}>
                    <WarningCircleIcon size={16} />
					<div>
						<p className="text-sm-semibold">{title}</p>
						<p className="text-sm">{description}</p>
					</div>
				</Toast.Title>
			</Toast.Root>
			<Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
        </>
	);
};
