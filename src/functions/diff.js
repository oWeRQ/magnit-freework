function onlyInArray(arr, without, getter = v => v) {
  const map = new Map;

  for (const item of arr) {
    map.set(getter(item), item);
  }

  for (const item of without) {
    map.delete(getter(item), item);
  }

  return [...map.values()];
}

export default function diff(arr1, arr2, getter) {
  return [onlyInArray(arr1, arr2, getter), onlyInArray(arr2, arr1, getter)];
}
