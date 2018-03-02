/**
 * Created by chenxing on 2018-3-2.
 */

var treeUtil = (function() {

    function Node() {
        this.data = {}
        this.prefix = '';
        this.parentNode = {}
        this.subNodes = []
    }

    var util = {
        _generateNodeList:function (zNodes) {
            var result = [];
            for (var i = 0; i < zNodes.length; i++) {
                var node = new Node();
                node.data = zNodes[i];
                result.push(node);
            }
            return result;
        },
        generateTree:function (data) {
            var root = new Node();
            var nodeList = this._generateNodeList(data);

            for (var i in nodeList) {
                var pId = nodeList[i].data.pId;
                var count = 0;
                for (var j in nodeList) {
                    if (nodeList[j].data.id == pId) {
                        count++;
                        nodeList[i].parentNode = nodeList[j];
                        nodeList[j].subNodes.push(nodeList[i]);
                        break;
                    }
                }

                if (count == 0) {
                    root.subNodes.push(nodeList[i]);
                }
            }

            if (root.subNodes.length == 1) {
                return root.subNodes[0];
            }

            return root;
        },
        GeneratingParagraphNumber:function (data) {
            var node = this.generateTree(data);
            var finalResult = [];
            node.prefix = '1';
            node.data.name = node.prefix + ' ' + node.data.name;
            finalResult.push(node.data);
            this._gpn(node, finalResult);
            return finalResult;
        },
        _gpn:function (node, finalResult) {
            var subNodes = node.subNodes;
            var parentPrefix = node.prefix;
            for (var i in subNodes) {
                var subNode = subNodes[i];
                subNode.prefix = parentPrefix + "." + (parseInt(i) + 1);
                subNode.data.name = subNode.prefix + ' ' + subNode.data.name;
                finalResult.push(subNode.data);
                if (subNode.subNodes.length != 0) {
                    this._gpn(subNode, finalResult);
                }
            }
        }
    }

    return util;


})();
