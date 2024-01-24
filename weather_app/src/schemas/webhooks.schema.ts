import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WebhookDocument = HydratedDocument<Webhook>;

@Schema()
export class Webhook {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  webhookURL: string;
}

export const WebhookSchema = SchemaFactory.createForClass(Webhook);
