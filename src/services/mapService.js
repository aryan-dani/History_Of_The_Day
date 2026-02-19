import { historyService } from "./historyService";

export const mapService = {
  getAllLocations: async () => {
    const events = await historyService.getAllEvents();
    return events
      .filter(
        (e) =>
          e.coordinates &&
          typeof e.coordinates.lat === "number" &&
          typeof e.coordinates.lng === "number",
      )
      .map((e) => ({
        id: e.id,
        name: e.location_name || e.location || "Unknown Location",
        lat: e.coordinates.lat,
        lng: e.coordinates.lng,
        title: e.title || "Untitled Event",
        category: e.category || "Uncategorized",
        description: e.description || e.short_summary || "",
        year: e.year,
        imageUrl: e.imageUrl,
        location_name: e.location_name,
      }));
  },

  getLocationById: async (id) => {
    const events = await historyService.getAllEvents();
    const event = events.find((e) => e.id === id);
    return event || null;
  },
};
