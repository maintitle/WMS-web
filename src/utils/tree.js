'use strict';
exports.formatRouter = {

  /**
   * 树形数据格式化，其中：
   * 子级的’parent_id‘等于父级的id,
   * 最高父级的id为0
   *
   * 排序规则为‘order’的数字顺序
   * */
  treeData(data) {
    // 对源数据深度克隆
    // const cloneData = JSON.parse(JSON.stringify(data));
    // filter嵌套filter相当于for循环嵌套for循环
    const result = data.filter(parent => {
      // 返回每一项的子级数组
      const branchArr = data.filter(child => parent.id === child.pid);

      // 若子级存在，则给子级排序；且，赋值给父级
      if (branchArr.length > 0) {
        branchArr.sort(this.compare('ordernum'));
        parent.children = branchArr;
      }
      // 返回最高的父级，即，parent_id为0，
      return parent.pid === 0;
    });
    // 给最高级的父级排序
    result.sort(this.compare('order'));
    return result;
  },
  // 对象数组排序
  compare(property) {
    return function(a, b) {
      const value1 = a[property];
      const value2 = b[property];
      return value1 - value2;// 升序,降序为value2 - value1
    };
  },
};