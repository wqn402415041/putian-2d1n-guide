const dayTabs = document.querySelectorAll(".day-tab");
const dayPanels = document.querySelectorAll(".day-panel");
const routeDayButtons = document.querySelectorAll(".route-day-button");
const routeMap = document.querySelector("#routeMap");
const navStops = document.querySelector("#navStops");

const routes = {
  day1: [
    {
      time: "09:50",
      name: "莆田站",
      query: "莆田站",
      note: "第一天起点。动车抵达后先去酒店寄存行李，站区出发优先走东出口。",
      x: 16,
      y: 86,
      mode: "driving",
    },
    {
      time: "10:25",
      name: "全季酒店兴化府步行街店",
      query: "全季酒店 莆田万达广场兴化府步行街店 胜利南街399号",
      note: "寄存行李。晚上回酒店也以这个点为终点。",
      x: 34,
      y: 72,
      mode: "driving",
    },
    {
      time: "12:20",
      name: "阿昌豆浆炒 / 龙桥扁食",
      query: "阿昌豆浆炒 建设路龙桥扁食 莆田",
      note: "午餐做小吃双拼：阿昌豆浆炒少量尝，龙桥扁食点拌泗粉加猪杂汤。",
      x: 58,
      y: 82,
      mode: "walking",
    },
    {
      time: "13:20",
      name: "兴化府历史文化街区",
      query: "莆田 兴化府历史文化街区 古谯楼 文献路",
      note: "老城 citywalk，顺路看古谯楼、文献路。",
      x: 76,
      y: 62,
      mode: "walking",
    },
    {
      time: "14:00",
      name: "广化寺",
      query: "莆田 广化寺",
      note: "下午主点位，留足 1.5-2 小时。",
      x: 24,
      y: 24,
      mode: "driving",
    },
    {
      time: "16:20",
      name: "阿酸四果汤 / 芋喜来",
      query: "莆田 阿酸四果汤 芋喜来",
      note: "下午茶补清爽甜口；想坐久一点再换有树 Usure。",
      x: 76,
      y: 28,
      mode: "driving",
    },
    {
      time: "18:30",
      name: "莆田菜正餐",
      query: "闽食佬兴化卤面 莆田菜 焖豆腐 荔枝肉",
      note: "晚餐升级成正餐：卤面、焖豆腐、荔枝肉、海蛎煎/海蛎饼，胃口够再加兴化炒米粉。",
      x: 61,
      y: 46,
      mode: "driving",
    },
    {
      time: "20:30",
      name: "杨氏大肠炝",
      query: "杨氏大肠炝 莆田",
      note: "夜宵备选，图片备注晚上开，必加油条。",
      x: 38,
      y: 54,
      mode: "walking",
    },
  ],
  day2: [
    {
      time: "08:30",
      name: "全季酒店兴化府步行街店",
      query: "全季酒店 莆田万达广场兴化府步行街店 胜利南街399号",
      note: "第二天从酒店出发，行李先放酒店。",
      x: 18,
      y: 74,
      mode: "walking",
    },
    {
      time: "08:45",
      name: "求生煎包 / 锅边糊",
      query: "求生煎包 锅边糊 莆田",
      note: "早餐主推求生煎包；没吃龙桥扁食就补扁食，再顺手补锅边糊或泗粉。",
      x: 42,
      y: 66,
      mode: "walking",
    },
    {
      time: "09:40",
      name: "绶溪公园",
      query: "莆田 绶溪公园",
      note: "上午散步拍照，天气太热就缩短停留。",
      x: 74,
      y: 34,
      mode: "driving",
    },
    {
      time: "11:40",
      name: "阿文炝肉补漏餐",
      query: "东门兜阿文炝肉 天天王 天九王 炝肉 莆田",
      note: "第一晚已吃正餐就选炝肉，搭配扁食、泗粉、红团或四果汤；没吃正餐就回头补卤面和焖豆腐。",
      x: 76,
      y: 54,
      mode: "driving",
    },
    {
      time: "12:30",
      name: "红团 / 四果汤补漏",
      query: "莆田 红团 阿酸四果汤 兴化府",
      note: "补一点没吃过的传统甜口或伴手礼，别绕远，老城附近顺手买。",
      x: 78,
      y: 80,
      mode: "walking",
    },
    {
      time: "13:20",
      name: "全季酒店取行李",
      query: "全季酒店 莆田万达广场兴化府步行街店 胜利南街399号",
      note: "回酒店取行李，预留去动车站时间。",
      x: 39,
      y: 48,
      mode: "driving",
    },
    {
      time: "14:59",
      name: "莆田站",
      query: "莆田站",
      note: "G3332 莆田站 14:59 - 福州站 15:41；市区进站西进站口相对近。",
      x: 18,
      y: 88,
      mode: "driving",
    },
  ],
};

function amapSearchUrl(stop) {
  const params = new URLSearchParams({
    keyword: stop.query,
    city: "莆田",
    view: "map",
    src: "codex_putian_h5",
  });
  return `https://uri.amap.com/search?${params.toString()}`;
}

function baiduDirectionUrl(stop, origin, mode = "driving") {
  const params = new URLSearchParams({
    origin: origin ? origin.query : "我的位置",
    destination: stop.query,
    mode,
    region: "莆田",
    output: "html",
    src: "codex.putian.h5",
  });
  return `https://api.map.baidu.com/direction?${params.toString()}`;
}

function renderRoute(dayKey) {
  const stops = routes[dayKey];
  if (!routeMap || !navStops || !stops) return;

  routeMap.innerHTML = [
    '<div class="map-path" aria-hidden="true"></div>',
    ...stops.map((stop, index) => `
      <button class="map-stop${index === 0 ? " active" : ""}" type="button" data-stop-index="${index}" style="--x: ${stop.x}%; --y: ${stop.y}%">
        <strong>${String(index + 1).padStart(2, "0")}</strong>
        <span>${stop.name}</span>
      </button>
    `),
  ].join("");

  navStops.innerHTML = stops.map((stop, index) => {
    const prev = stops[index - 1];
    const legMode = stop.mode || "driving";
    return `
      <li class="nav-stop" id="stop-${dayKey}-${index}">
        <div class="nav-stop-header">
          <span class="nav-stop-index">${index + 1}</span>
          <div>
            <h3>${stop.time} · ${stop.name}</h3>
            <p>${stop.note}</p>
          </div>
        </div>
        <div class="nav-actions">
          <a class="nav-action primary" target="_blank" rel="noopener" href="${baiduDirectionUrl(stop, null, "driving")}">导航到这里</a>
          <a class="nav-action${prev ? "" : " disabled"}" target="_blank" rel="noopener" href="${prev ? baiduDirectionUrl(stop, prev, legMode) : "#"}">从上一站导航</a>
          <a class="nav-action" target="_blank" rel="noopener" href="${amapSearchUrl(stop)}">高德搜点</a>
        </div>
      </li>
    `;
  }).join("");

  routeMap.querySelectorAll(".map-stop").forEach((button) => {
    button.addEventListener("click", () => {
      routeMap.querySelectorAll(".map-stop").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const index = button.dataset.stopIndex;
      document.querySelector(`#stop-${dayKey}-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}

dayTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.day;
    dayTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", active ? "true" : "false");
    });
    dayPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === target);
    });
  });
});

routeDayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.routeDay;
    routeDayButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", active ? "true" : "false");
    });
    renderRoute(target);
  });
});

renderRoute("day1");
