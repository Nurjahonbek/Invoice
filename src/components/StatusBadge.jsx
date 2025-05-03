const StatusBadge = ({ status }) => {
    const statusConfig = {
      paid: {
        text: 'Paid',
        bg: 'bg-green-100',
        textColor: 'text-green-800',
        dot: 'bg-green-500'
      },
      pending: {
        text: 'Pending',
        bg: 'bg-orange-100',
        textColor: 'text-orange-800',
        dot: 'bg-orange-500'
      },
      draft: {
        text: 'Draft',
        bg: 'bg-gray-100',
        textColor: 'text-gray-800',
        dot: 'bg-gray-500'
      }
    };

    const { text, bg, textColor, dot } = statusConfig[status] || statusConfig.draft;

    return (
      <div className={`${bg} ${textColor} px-4 py-2 rounded-md flex items-center`}>
        <span className={`w-2 h-2 ${dot} rounded-full mr-2`}></span>
        {text}
      </div>
    );
  };

  export default StatusBadge;