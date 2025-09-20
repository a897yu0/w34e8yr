import type { DialogContext } from "@/types/DialogContext";
import type { DialogProps } from "@/types/props/DialogProps";

function Dialog(props: DialogProps): React.JSX.Element {
  const onClose: () => void = props.onClose;
  
  const ctx: DialogContext = props.ctx;

  return (
    <div className="fixed inset-0 bg-gray-400/50 flex items-center justify-center z-50">
      <div className="bg-white shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-black mb-4">
            {ctx.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {ctx.message}
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => onClose()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onClose();
                ctx.onConfirm();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
