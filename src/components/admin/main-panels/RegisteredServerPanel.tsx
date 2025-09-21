import type { AdminMainPanelProps } from "@/types/props/admin/AdminMainPanelProps";

function RegisteredServerPanel(props: AdminMainPanelProps): React.JSX.Element {
  props;

  /**
   * Features:
   * List of accounts logged in with when logged in, where, which platform, email, ip, location, android or ios, chrome/safari etc...
   */

  return (
    <>
      {/* Header */}
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-2 text-black">Registered Server</h1>
        <div className="flex flex-col items-start gap-5 mb-4">
          <div className="flex flex-row flex-wrap gap-2">
            <div className="text-lg text-black text-nowrap">
              Name: <span className="font-semibold">backup-storage-02</span>
            </div>
            <div className="text-lg text-black text-nowrap">
              IP Address: <span className="font-semibold">10.0.3.21</span>
            </div>
            <div className="text-lg text-black text-nowrap">
              Status: <span className="font-semibold">Offline</span>
            </div>
            <div className="text-lg text-black text-nowrap">
              Last Ping: <span className="font-semibold">1/14/2024, 10:15:00 PM</span>
            </div>
            <div className="text-lg text-black text-nowrap">
              Registered: <span className="font-semibold">1/2/2024, 4:50:00 PM</span>
            </div>
            <div className="text-lg text-black text-nowrap">
              Account Required: <span className="font-semibold">No</span>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2">
            <div className="text-lg text-black text-nowrap">
              Capacity: <span className="font-semibold">50 TB</span>
            </div>
            <div className="text-lg text-black text-nowrap">
              FreeSpace: <span className="font-semibold">40 TB</span>
            </div>
            <div className="text-lg text-black text-nowrap">
              Usage: <span className="font-semibold">20.0 %</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-black border-b-1 my-4" />

    </>
  );
}

export default RegisteredServerPanel;
