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
        <h1 className="text-2xl font-bold mb-5">Registered Server</h1>
        <div className="@container flex flex-col items-start">
          <div className="grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-x-3 mb-4">
            <div className="flex flex-row flex-wrap gap-1">
              <strong>Name: </strong>
              <span>backup-storage-02</span>
            </div>
            <div className="flex flex-row flex-wrap gap-1">
              <strong>IP Address: </strong>
              <span>10.0.3.21</span>
            </div>
            <div className="flex flex-row flex-wrap gap-1">
              <strong>Status: </strong>
              <span>Offline</span>
            </div>
            <div className="flex flex-row flex-wrap gap-1">
              <strong>Last Ping: </strong>
              <span>1/14/2024, 10:15:00 PM</span>
            </div>
            <div className="flex flex-row flex-wrap gap-1">
              <strong>Registered: </strong>
              <span>1/2/2024, 4:50:00 PM</span>
            </div>
            <div className="flex flex-row flex-wrap gap-1">
              <strong>Account Required: </strong>
              <span>No</span>
            </div>
          </div>
          <div className="grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-x-3 mb-4">
            <div className="flex flex-row flex-wrap gap-1">
              <strong>Capacity: </strong>
              <span>50 TB</span>
            </div>
            <div className="flex flex-row flex-wrap gap-1">
              <strong>FreeSpace: </strong>
              <span>40 TB</span>
            </div>
            <div className="flex flex-row flex-wrap gap-1">
              <strong>Usage: </strong>
              <span>20.0 %</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-black border-b-1 my-4" />

    </>
  );
}

export default RegisteredServerPanel;
