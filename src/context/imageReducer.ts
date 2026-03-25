import type { ImageFile, ProcessedImage } from '../types/image.types';

export type ImageAction =
  | { type: 'ADD'; payload: ImageFile[] }
  | { type: 'UPDATE_STATUS'; payload: { id: string; status: ImageFile['status']; result?: ProcessedImage; error?: string } }
  | { type: 'REMOVE'; payload: string }
  | { type: 'CLEAR' }
  | { type: 'RESET_STATUS' };

export function imageReducer(state: ImageFile[], action: ImageAction): ImageFile[] {
  switch (action.type) {
    case 'ADD':
      return [...state, ...action.payload];
    case 'UPDATE_STATUS':
      return state.map((img) =>
        img.id === action.payload.id
          ? { ...img, status: action.payload.status, result: action.payload.result ?? img.result, error: action.payload.error }
          : img,
      );
    case 'REMOVE':
      return state.filter((img) => {
        if (img.id === action.payload) {
          if (img.preview) URL.revokeObjectURL(img.preview);
          if (img.result?.url) URL.revokeObjectURL(img.result.url);
          return false;
        }
        return true;
      });
    case 'CLEAR':
      state.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
        if (img.result?.url) URL.revokeObjectURL(img.result.url);
      });
      return [];
    case 'RESET_STATUS':
      return state.map((img) => ({
        ...img,
        status: img.isAnimatedGif ? 'error' : 'pending' as const,
        result: undefined,
        error: img.isAnimatedGif ? 'animated_gif_not_supported' : undefined,
        progress: 0,
      }));
    default:
      return state;
  }
}
