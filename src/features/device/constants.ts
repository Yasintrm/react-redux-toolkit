// Place constants here, if any.

export const Constants = {
    apiEndPoints: {
        eu: {
            devices: "/api/eu-devices.json",
            availability: "/api/eu-availability.json"
        },
        us: {
            devices: "api/us-devices.json",
            availability: "api/us-availability.json"
        }
    },
    buildImageUrlFromDescriptorId: (descriptorId: string) => `https://d3ty40hendov17.cloudfront.net/device-pictures/${descriptorId}.png`,
    brokenImageUrl: "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg",
    refreshPeriodInSeconds: 60,
    osFilters: ["All", "Android", "iOS"] as const,
    availabilityFilters: ["All", "Available", "Not Available"] as const,
    formFactorFilters: ["All", "Phone", "Tablet"] as const,
    regions: ["us", "eu"] as const
};