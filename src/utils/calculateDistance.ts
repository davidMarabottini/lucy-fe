export const calculateDistance = ([lat1, lon1]: [number, number], [lat2, lon2]: [number, number]): string => {
  const R = 6371; // Raggio terra in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return d > 1 ? `${d.toFixed(2)} km` : `${(d * 1000).toFixed(0)} m`;
};
