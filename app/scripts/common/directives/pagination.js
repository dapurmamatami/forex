(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twPagination', twPagination);

    twPagination.$inject = [];

    function twPagination() {
        var pagination = {
            config: {
                total: 1, // 总页数
                size: 1,  // 1 ... 56789 ... 100 中间的个数
                page: 1   // 当前页
            },
            updateConfig: updateConfig,
            noPrevious: noPrevious,
            noNext: noNext,
            isActive: isActive,
            makePage: makePage,
            getPages: getPages,
            selectPage: selectPage,
            render: render
        };

        function updateConfig(pageInfo) {
            pageInfo = angular.extend(this.config, pageInfo);
        }

        function noPrevious() {
            return parseInt(this.config.page) === 1;
        }

        function noNext() {
            return parseInt(this.config.page) === parseInt(this.config.total);
        }

        function isActive(page) {
            return parseInt(this.config.page) === parseInt(page);
        }

        function makePage(number, text, isActive, isDisabled) {
            return {
                number: number,
                text: text,
                active: isActive,
                disabled: isDisabled
            };
        }

        function getPages() {
            if (this.config.total <= 1) return;
            var pages = [],
                startPage = 1,
                endPage = this.config.total,
                isMaxSized = (this.config.size && this.config.size < this.config.total);
            
            if (isMaxSized) {
                startPage = Math.max(this.config.page - Math.floor(this.config.size / 2), 1);
                endPage = startPage + this.config.size - 1;

                if (endPage > this.config.total) {
                    endPage = this.config.total;
                    startPage = endPage - this.config.size + 1;
                }
            }

            for (var number = startPage; number <= endPage; number++) {

                if (number === 1 || number === this.config.total) continue;

                var page = this.makePage(number, number, this.isActive(number), false);
                pages.push(page);
            }

            if (isMaxSized) {

                if (startPage > 2) {
                    var previousPageSet = this.makePage(startPage - 1, '...', false, false);
                    pages.unshift(previousPageSet);
                }

                if (endPage < this.config.total - 1) {
                    var nextPageSet = this.makePage(endPage + 1, '...', false, false);
                    pages.push(nextPageSet);
                }
            }

            var firstPage = this.makePage(1, 1, this.isActive(1), false);
            pages.unshift(firstPage);
            var lastPage = this.makePage(this.config.total, this.config.total,
                    this.isActive(this.config.total), false);
            pages.push(lastPage);
            var previousPage = this.makePage(this.config.page - 1, '<<', false, this.noPrevious());
            pages.unshift(previousPage);
            var nextPage = this.makePage(this.config.page + 1, '>>', false, this.noNext());
            pages.push(nextPage);
            return pages;
        }

        function selectPage(pagebar, page) {
            pagebar.config.page = page;
            this.render(pagebar);
            pagebar.getList(page, pagebar.args.date);
        }

        function render(pagebar) {
            pagebar.pages = this.getPages();
        }
        
        return {
            restrict: 'A',
            template: 
                '<ul class="pagination">' +
                    '<li ng-repeat="page in pagebar.pages"' +
                    'ng-class="{active:page.active,disabled:page.disabled}">' +
                        '<a href="" ng-click="pagebar.selectPage(page.number)">' +
                            '{{page.text}}' +
                        '</a>' +
                    '</li>' +
                '</ul>',
            replace: true,
            link: function (scope, element, attrs) {

                scope.$watch('pagebar', function (newVal, oldVal) {
                    if (newVal === oldVal) return;
                    pagination.updateConfig(newVal.config);
                    pagination.render(newVal);
                }, true);

                scope.pagebar.selectPage = angular.bind(pagination, 
                        pagination.selectPage, scope.pagebar);
            }


        };
    }
})();























