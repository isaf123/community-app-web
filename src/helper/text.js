export const trimText = (text, mount) => {
  if (text === 0) {
    return "..";
  } else if (typeof text === "string") {
    if (text.length < mount + 2) {
      return text;
    } else {
      return `${text.slice(0, mount)}...`;
    }
  }
};

export const formatDate = (date) => {
  const dateFormated = new Date(date);

  // Format tanggal dalam bahasa Inggris dengan bulan disingkat
  const formattedDate = dateFormated.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return formattedDate;
};
