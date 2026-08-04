import { z } from "zod";

export const bookingFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Passenger Name must be at least 2 characters" })
    .max(80, { message: "Name cannot exceed 80 characters" }),
  mobileNumber: z
    .string()
    .min(10, { message: "Mobile number must be exactly 10 digits" })
    .max(10, { message: "Mobile number must be exactly 10 digits" })
    .regex(/^[0-9]{10}$/, { message: "Mobile number must contain only 10 numeric digits" }),
  pickupLocation: z
    .string()
    .min(2, { message: "Pickup location (From) is required" }),
  destination: z
    .string()
    .min(2, { message: "Destination (To) is required" }),
  journeyDate: z
    .string()
    .min(1, { message: "Journey date is required" }),
  seaterCount: z
    .number({ invalid_type_error: "Seater count is required" })
    .min(0, { message: "Seater count cannot be negative" })
    .max(20, { message: "Max 20 seater seats per inquiry" }),
  sleeperCount: z
    .number({ invalid_type_error: "Sleeper count is required" })
    .min(0, { message: "Sleeper count cannot be negative" })
    .max(20, { message: "Max 20 sleeper berths per inquiry" }),
  busType: z.enum(["Volvo AC", "Non-AC"], {
    required_error: "Please select bus type",
  }),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select gender",
  }),
  pickupAddress: z
    .string()
    .min(3, { message: "Pickup address is required" }),
  additionalNotes: z.string().optional(),
}).refine(
  (data) => data.seaterCount > 0 || data.sleeperCount > 0,
  {
    message: "Please select at least 1 Seater seat or 1 Sleeper berth",
    path: ["seaterCount"],
  }
);

export type BookingFormData = z.infer<typeof bookingFormSchema>;

export interface BookingSubmissionData extends BookingFormData {
  inquiryId: string;
  submittedAt: string;
  whatsAppUrl: string;
}
