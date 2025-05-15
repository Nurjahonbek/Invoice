import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function queryGenerator(obj) {
  let result = "";
  Object.entries(obj).forEach(([key, value]) => {
    if (value) {
      result += result.length ? `|${key}` : `${key}`;
    }
  });
  return result;
}


export function prepareData(obj) {
  const senderAddressKey = "senderAddress-";
  const clientAddressKey = "clientAddress-";

  const senderAddress = {};
  const clientAddress = {};
  const result = { clientAddress, senderAddress };

  for (const key in obj) {
    if (key.startsWith(senderAddressKey)) {
      const newKey = key.replace(senderAddressKey, "");
      senderAddress[newKey] = obj[key];
    }
    if (key.startsWith(clientAddressKey)) {
      const newKey = key.replace(clientAddressKey, "");
      clientAddress[newKey] = obj[key];
    }
  }

  for (const key in obj) {
    if (
      !key.startsWith(senderAddressKey) &&
      !key.startsWith(clientAddressKey)
    ) {
      result[key] = obj[key];
    }
  }

  const total = obj.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  result.total = total;

  return result;
}
