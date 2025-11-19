import AddressTableRow from "./AddressTableRow";

export default function AddressTable({ addresses, isAuthenticated, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
                Gender
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
                City
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
                Bio
              </th>
              {isAuthenticated && (
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {addresses.map((address, index) => (
              <AddressTableRow
                key={address._id}
                address={address}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
