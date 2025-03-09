export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';

export const getTimeOfDay = (date = new Date()): TimeOfDay => {
  const hour = date.getHours();
  
  if (hour >= 5 && hour < 7) return 'dawn';
  if (hour >= 7 && hour < 17) return 'day';
  if (hour >= 17 && hour < 19) return 'dusk';
  return 'night';
};

export const getThemeColors = (timeOfDay: TimeOfDay) => {
  switch (timeOfDay) {
    case 'dawn':
      return {
        background: 'linear-gradient(to bottom right, #FF9A8B, #FF6A88)',
        text: '#2C1810',
        shadow: 'rgba(255, 154, 139, 0.2)'
      };
    case 'day':
      return {
        background: 'linear-gradient(to bottom right, #FFFFFF, #F0F2F5)',
        text: '#333333',
        shadow: 'rgba(0, 0, 0, 0.1)'
      };
    case 'dusk':
      return {
        background: 'linear-gradient(to bottom right, #FBC2EB, #A6C1EE)',
        text: '#2C1810',
        shadow: 'rgba(251, 194, 235, 0.2)'
      };
    case 'night':
      return {
        background: 'linear-gradient(to bottom right, #2C3E50, #3498DB)',
        text: '#FFFFFF',
        shadow: 'rgba(0, 0, 0, 0.2)'
      };
  };
}; 