import ActionButtons from "./ActionButtons";

export default function AddressTableRow({ address, index, onEdit, onDelete, isAuthenticated }) {
  return (
    <tr
      className="transition-colors duration-150 hover:bg-indigo-50"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <td className="whitespace-nowrap px-6 py-4">
        <div className="flex items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-bold text-white">
            {address.name.charAt(0).toUpperCase()}
          </div>
          <span className="ml-3 text-sm font-semibold text-slate-900">{address.name}</span>
        </div>
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-800">
          {address.gender}
        </span>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
        {address.email}
      </td>
      <td className="whitespace-nowrap px-6 py-4">
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
          {address.city}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-slate-600">
        <p className="max-w-xs truncate">{address.bio}</p>
      </td>
      {isAuthenticated && (
        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
          <ActionButtons onEdit={() => onEdit(address)} onDelete={() => onDelete(address._id)} />
        </td>
      )}
    </tr>
  );
}
