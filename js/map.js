// 声明一个全局的 map 变量
var map;

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
   try {
       // 创建地图实例
       map = new AMap.Map('marchMap', {
           zoom: 5,
           center: [106.937799, 27.831944],
           resizeEnable: true,
           mapStyle: 'amap://styles/light',
           features: ['bg', 'building', 'point']
       });

       // 添加地图边界线
       var provinceBounds = new AMap.DistrictLayer.Province({
           zIndex: 12,
           adcode: [],
           depth: 1,
           styles: {
               'province-stroke': '#666666',
               'province-stroke-width': 1,
               'fill': 'transparent'
           }
       });
       map.add(provinceBounds);

       // 添加地图加载完成的回调
       map.on('complete', function() {
           console.log('地图加载完成');
       });

       // 定义各方面军路线点
       var armyRoutes = {
           // 中央红军（第一方面军）
           central: [
               { name: '瑞金', location: [116.027112, 25.885571], type: 'star' },
               { name: '于都', location: [115.415524, 25.952066], type: 'point' },
               { name: '通道会议', location: [111.679941, 26.573143], type: 'point' },
               { name: '遵义会议', location: [106.937799, 27.831944], type: 'point' },
               { name: '四渡赤水', location: [105.698116, 28.590337], type: 'point' },
               { name: '巧渡金沙江', location: [102.235326, 26.914246], type: 'point' },
               { name: '强渡大渡河', location: [102.814189, 29.347836], type: 'point' },
               { name: '飞夺泸定桥', location: [102.234772, 29.914141], type: 'point' },
               { name: '翻越夹金山', location: [102.864435, 31.476383], type: 'point' },
               { name: '会宁', location: [105.053375, 35.692909], type: 'star' }
           ],
           // 红四方面军
           fourth: [
               { name: '川陕苏区', location: [106.082974, 31.858809], type: 'star' },
               { name: '懋功', location: [103.358147, 32.287234], type: 'point' },
               { name: '两河口', location: [104.2, 33.1], type: 'point' },
               { name: '会宁', location: [105.053375, 35.692909], type: 'point' }
           ],
           // 红二方面军
           second: [
               { name: '湘赣苏区', location: [114.238478, 27.827957], type: 'star' },
               { name: '通道', location: [111.783900, 26.637359], type: 'point' },
               { name: '贵州', location: [106.713478, 26.578343], type: 'point' },
               { name: '会宁', location: [105.053375, 35.692909], type: 'point' }
           ],
           // 敌军封锁线
           blockade: [
               {
                   path: [[115.5, 24.5], [113.5, 25.5], [111.5, 26.5]],
                   name: '第一道封锁线'
               },
               {
                   path: [[114.5, 26.5], [112.5, 27.5], [110.5, 28.5]],
                   name: '第二道封锁线'
               },
               {
                   path: [[113.5, 28.5], [111.5, 29.5], [109.5, 30.5]],
                   name: '第三道封锁线'
               },
               {
                   path: [[112.5, 30.5], [110.5, 31.5], [108.5, 32.5]],
                   name: '第四道封锁线'
               }
           ]
       };
        // 定义各类路线样式
       var styles = {
           central: {
               // 中央红军 - 粗实线+箭头
               color: '#c41e3a',
               weight: 3,
               dash: [0],  // 实线
               opacity: 0.9,
               showDir: true,  // 启用方向箭头
               dirArrowStyle: {
                   width: 8,    // 增大箭头宽度
                   height: 8,   // 增大箭头高度
                   color: '#c41e3a',  // 箭头颜色
                   spacing: 100  // 减小箭头间距，使箭头更密集
               }
           },
           fourth: {
               // 红四方面军 - 长虚线+箭头
               color: '#1874CD',
               weight: 2,
               dash: [15, 8],
               opacity: 0.8,
               showDir: true,
               dirArrowStyle: {
                   width: 6,
                   height: 6,
                   color: '#1874CD',
                   spacing: 100
               }
           },
           second: {
               // 红二方面军 - 点虚线+箭头
               color: '#228B22',
               weight: 2,
               dash: [4, 8],
               opacity: 0.8,
               showDir: true,
               dirArrowStyle: {
                   width: 6,
                   height: 6,
                   color: '#228B22',
                   spacing: 100
               }
           },
           blockade: {
               // 敌军封锁线 - 细短虚线
               color: '#000',
               weight: 1.5,
               dash: [4, 4],
               opacity: 0.5
           }
       };
        // 绘制各方面军路线和标记点
       Object.keys(armyRoutes).forEach(function(type) {
           if (type === 'blockade') {
               // 绘制封锁线
               armyRoutes[type].forEach(function(line) {
                   var polyline = new AMap.Polyline({
                       path: line.path,
                       strokeColor: styles.blockade.color,
                       strokeWeight: styles.blockade.weight,
                       strokeStyle: 'dashed',
                       strokeDasharray: styles.blockade.dash,
                       strokeOpacity: styles.blockade.opacity,
                       lineJoin: 'round',
                       lineCap: 'round'
                   });
                   polyline.setMap(map);
                    // 添加封锁线标签
                   var center = line.path[Math.floor(line.path.length / 2)];
                   var marker = new AMap.Text({
                       text: line.name,
                       position: center,
                       offset: new AMap.Pixel(0, -15),
                       style: {
                           'background-color': 'transparent',
                           'border': 'none',
                           'font-size': '11px',
                           'color': '#000',
                           'padding': '2px 5px'
                       }
                   });
                   marker.setMap(map);
               });
           } else {
               // 绘制行军路线
               var points = armyRoutes[type];
               var style = styles[type];
               var path = points.map(function(p) { return p.location; });
                // 主路线
               var polyline = new AMap.Polyline({
                   path: path,
                   strokeColor: style.color,
                   strokeWeight: style.weight,
                   strokeStyle: style.dash[0] === 0 ? 'solid' : 'dashed',
                   strokeDasharray: style.dash,
                   strokeOpacity: style.opacity,
                   lineJoin: 'round',
                   lineCap: 'round'
               });
               polyline.setMap(map);
                // 添加箭头标记
               addArrowsToPath(path, style);
                // 添加记点
               points.forEach(function(point) {
                   if (!style || !point) return; // 添加安全检查
                   
                   // 创建标记容器
                   var markerContent = document.createElement('div');
                   var markerStyle = {
                       color: style.color || '#c41e3a',  // 设置默认颜色
                       weight: style.weight || 3,         // 设置默认宽度
                       opacity: style.opacity || 0.9      // 设置默认透明度
                   };
                   
                   var markerHtml = '';
                   if (point.type === 'star') {
                       // 重要地点样式（星标）
                       markerHtml = 
                           '<div style="' +
                               'position: relative;' +
                               'padding: 6px 12px;' +
                               'background: linear-gradient(to bottom, white, #f8f8f8);' +  // 添加渐变背景
                               'border-radius: 4px;' +
                               'box-shadow: 0 2px 8px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1);' +  // 优化阴影效果
                               'font-size: 12px;' +
                               'font-weight: bold;' +
                               'color: ' + markerStyle.color + ';' +
                               'border: 2px solid ' + markerStyle.color + ';' +
                               'display: flex;' +
                               'align-items: center;' +
                               'white-space: nowrap;' +
                               '">' +
                               '<span style="color: ' + markerStyle.color + ';margin-right: 4px;font-size: 14px;">★</span>' +
                               (point.name || '') +
                               '<div style="' +
                               'position: absolute;' +
                               'bottom: -6px;' +
                               'left: 50%;' +
                               'transform: translateX(-50%) rotate(45deg);' +
                               'width: 10px;' +
                               'height: 10px;' +
                               'background: white;' +
                               'border-right: 2px solid ' + markerStyle.color + ';' +
                               'border-bottom: 2px solid ' + markerStyle.color + ';' +
                               '"></div>' +
                               '</div>';
                   } else {
                       // 普通地点样式
                       markerHtml = 
                           '<div style="' +
                               'position: relative;' +
                               'padding: 4px 10px;' +
                               'background: rgba(255,255,255,0.95);' +
                               'border-radius: 3px;' +
                               'box-shadow: 0 2px 4px rgba(0,0,0,0.15);' +
                               'font-size: 11px;' +
                               'color: #333;' +
                               'border: 1px solid ' + markerStyle.color + ';' +
                               'display: flex;' +
                               'align-items: center;' +
                               'white-space: nowrap;' +
                               '">' +
                               '<span style="color: ' + markerStyle.color + ';margin-right: 4px;font-size: 12px;">●</span>' +
                               (point.name || '') +
                               '<div style="' +
                               'position: absolute;' +
                               'bottom: -5px;' +
                               'left: 50%;' +
                               'transform: translateX(-50%) rotate(45deg);' +
                               'width: 8px;' +
                               'height: 8px;' +
                               'background: white;' +
                               'border-right: 1px solid ' + markerStyle.color + ';' +
                               'border-bottom: 1px solid ' + markerStyle.color + ';' +
                               '"></div>' +
                               '</div>';
                   }

                   markerContent.innerHTML = markerHtml;

                   try {
                       // 创建标记
                       var marker = new AMap.Marker({
                           position: point.location,
                           content: markerContent,
                           offset: new AMap.Pixel(0, -20),
                           zIndex: point.type === 'star' ? 110 : 100
                       });

                       marker.setMap(map);
                   } catch (error) {
                       console.error('创建标记失败:', error);
                   }
               });
           }
       });
        // 自适应显示所有点
       map.setFitView();
    } catch (error) {
       console.error('地图初始化失败:', error);
   }
});
// 添加全局错误处理
window.addEventListener('error', function(event) {
   console.error('地图载错误:', event.error);
});

// 修改���头标记函数
function addArrowsToPath(path, style) {
    // 每隔几个点添加一个箭头
    for (let i = 0; i < path.length - 1; i += 2) {
        let start = path[i];
        let end = path[i + 1];
        
        // 计算箭头位置（在线段中点）
        let arrowLng = (start[0] + end[0]) / 2;
        let arrowLat = (start[1] + end[1]) / 2;
        
        // 计算箭头旋转角度
        let angle = Math.atan2(end[1] - start[1], end[0] - start[0]) * 180 / Math.PI;
        
        // 创建箭头元素
        let arrowMarker = new AMap.Marker({
            position: [arrowLng, arrowLat],
            content: '<div style="' +
                'width: 0;' +
                'height: 0;' +
                'border-left: ' + (style.weight * 5) + 'px solid ' + style.color + ';' +
                'border-top: ' + (style.weight * 3) + 'px solid transparent;' +
                'border-bottom: ' + (style.weight * 3) + 'px solid transparent;' +
                'opacity: ' + style.opacity + ';' +
                'transform: rotate(' + angle + 'deg);' +
                '"></div>',
            offset: new AMap.Pixel(-6, -6)
        });
        
        arrowMarker.setMap(map);
    }
}