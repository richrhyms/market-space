import { Document, Schema, model } from 'mongoose';

export interface IKoketRecipe extends Document {
  id?: string;
  name?: string;
  url?: string;
  image?: string;
  cooking_time?: string;
  source?: {
    id?: number;
    name?: string;
    url?: string;
    image?: {
      id?: number;
      name?: string;
      photographer?: string;
      url?: string;
    },
    logo_image?: {
      id?: number;
      name?: string;
      url?: string;
    },
    source_type?: string;
  },
  source_image?: {
    id?: number;
    name?: string;
    url?: string;
  },
  author?: {
    type?: string;
    name?: string;
  };
  profiles?: [
    {
      id?: number;
      name?: string;
      url?: string;
      image?: {
        id: number;
        name: string;
        photographer: string;
        url: string;
      },
    }
  ],
  first_publish_at?: string;
  computed_properties?: {
    disablePortionsConverter?: false,
    simple?: false,
    fishOrShellfish?: false,
    containsMeat?: true,
    vegetarian?: false,
    drinkTip?: false
  },
  description?: string;
  recipeYield?: string;
  recipeIngredient?: Array<string>;
  recipeInstructions?: Array<string>;
  aggregateRating?: {
    ratingValue?: string;
    ratingCount?: string;
    bestRating?: string;
    worstRating?: string;
  };
  video?: {
    description?: string;
    thumbnailUrl?: string;
    contentUrl?: string;
    embedUrl?: string;
    uploadDate?: string;
  };
  migrated: boolean;
}

export interface IKoketRecipeObject {
  _id?: IKoketRecipe['_id'];
  id?: IKoketRecipe['id'];
  name?: IKoketRecipe['name'];
  url?: IKoketRecipe['url'];
  image?: IKoketRecipe['image'];
  cooking_time?: IKoketRecipe['cooking_time'];
  source?: IKoketRecipe['source'];
  source_image?: IKoketRecipe['source_image'];
  author?: IKoketRecipe['author'];
  profiles?: IKoketRecipe['profiles'];
  first_publish_at?: IKoketRecipe['first_publish_at'];
  computed_properties?: IKoketRecipe['computed_properties'];
  description?: IKoketRecipe['description'];
  recipeYield?: IKoketRecipe['recipeYield'];
  recipeIngredient?: IKoketRecipe['recipeIngredient'];
  recipeInstructions?: IKoketRecipe['recipeInstructions'];
  aggregateRating?: IKoketRecipe['aggregateRating'];
  video?: IKoketRecipe['video'];
  migrated?: IKoketRecipe['migrated'];
}

export const KoketRecipeSchema = new Schema(
  {
    id: { type: String, unique: true, required: true },
    name: String,
    url: { type: String, unique: true, required: true },
    image: String,
    cooking_time: String,
    source: {
      id: Number,
      name: String,
      url: String,
      image: {
        id: Number,
        name: String,
        photographer: String,
        url: String,
      },
      logo_image: {
        id: Number,
        name: String,
        url: String,
      },
      source_type: String,
    },
    source_image: {
      id: Number,
      name: String,
      url: String,
    },
    author: Object,
    profiles: [
      {
        id: Number,
        name: String,
        url: String,
        image: {
          id: Number,
          name: String,
          photographer: String,
          url: String,
        }
      }
    ],
    first_publish_at: String,
    computed_properties: {
      disablePortionsConverter: Boolean,
      simple: Boolean,
      fishOrShellfish: Boolean,
      containsMeat: Boolean,
      vegetarian: Boolean,
      drinkTip: Boolean
    },
    description: String,
    recipeYield: String,
    recipeIngredient: [String],
    recipeInstructions: [String],
    aggregateRating: {
      ratingValue: String,
      ratingCount: String,
      bestRating: String,
      worstRating: String,
    },
    video: {
      description: String,
      thumbnailUrl: String,
      contentUrl: String,
      embedUrl: String,
      uploadDate: String,
    },
    migrated: Boolean
  },

  { timestamps: true, }
);

KoketRecipeSchema.index({ title: 1, url: 1 });

export const KoketRecipeModel = model<IKoketRecipe>('KoketRecipe', KoketRecipeSchema);
