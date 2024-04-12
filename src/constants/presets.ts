export const presetsCommon = [
  {
    name: 'Блок',
    // eslint-disable-next-line no-template-curly-in-string
    svg: '<style>.svg-type-3{display:block;color:black;font:14px  serif;overflow:auto;padding:1px;border:solid 2px #ccc;background:lightyellow;width:auto;}</style><div class="svg-type-3" style="width: ${width}px"><span style="padding:3px;display:block;border-bottom:solid 2px #ccc;margin-bottom:3px">${className}</span>${properties}</div>',
    width: 100,
    height: 80,
  },
  {
    name: 'Подчеркивание',
    svg: '<svg width="100" height="15" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g class="layer"><title>Layer1</title><line fill="none" id="svg_1" stroke="#000000" stroke-width="5" x1="-27" x2="125.08" y1="7.31" y2="7.31"/></g></svg>',
    width: 100,
    height: 15,
  },
  {
    name: 'Действие',
    // eslint-disable-next-line no-template-curly-in-string
    svg: '<style>.svg-type-2{display:block;color:black;font:14px serif;overflow:auto;padding:9px;border:solid 2px #ccc;background:#ffeeee;width:auto;}</style><div class="svg-type-2" style="width:${width}px">${text}</div>',
    width: 100,
    height: 40,
  },
  {
    name: 'Актер',
    // eslint-disable-next-line no-template-curly-in-string
    svg: '<svg viewBox="0 0 24 24" style="height: ${height}px; width: ${width}px;"  xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M12,2A3,3 0 0,1 15,5A3,3 0 0,1 12,8A3,3 0 0,1 9,5A3,3 0 0,1 12,2M11,22H8V16H6V9H18V16H16V22H13V18H11V22Z"></path></svg>',
    width: 60,
    height: 60,
  },
];

export const presetsAlgorithms = [];

export const presetsUml = [];
